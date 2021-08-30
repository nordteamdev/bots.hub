<?php

/*

Kontackt License Agreement (DMCA License)

Copyright (c) 2015, Alex Dobrovolscki (dobriisasa@gmail.com)
All rights reserved.

* Redistributions of source code is strictly forbidden.

* By using Kontackt you may have your own purchase copy, if you are not own a license, you can buy one from https://codecanyon.net/user/dobrovolscki/portfolio.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/


session_start();


function get_questions(){
	global $conn;	
	$notIn = "";
	if(isset($_SESSION['answered']) && count($_SESSION['answered'])){
		$answered = implode(",",$_SESSION['answered']);
		$notIn = " where id not in (".$answered.")";
	}
	
	//echo "SELECT * FROM `questions` $notIn limit 1";
	$stmt = $conn->prepare("SELECT * FROM `questions` $notIn limit 1");
	$stmt->execute();
	$stmt->setFetchMode(PDO::FETCH_ASSOC);  
	$question = $stmt->fetch();
	
	// add question id to session so we can ignore this question 
	$_SESSION['answered'][] = $question["id"];
	$_SESSION['question']   = $question["id"];

	$stmt = $conn->prepare("SELECT * FROM `answers` where question_id = ?");
	$stmt->execute(array($question['id']));
	$stmt->setFetchMode(PDO::FETCH_ASSOC);  

	while($info = $stmt->fetch()){
		$answers[$info["id"]] = $info["answer"];	
	}
	echo '{"id":"'.$question["id"].'","question":"'.$question["question"].'","answers":'.json_encode($answers).'}';
}

function save_answer($post){
	global $conn;	

	$ans  = $post['ans'];
	$ques = $_SESSION['question'];
	
	$stmt = $conn->prepare("insert into poll_answers(question_id,answer_id,user_ip) values(:qid,:aid,:ip)");
	$success = $stmt->execute(array(
			":qid" => $ques,
			":aid" => $ans,
			":ip" => $_SERVER['REMOTE_ADDR']
		   ));
	
	if($success){
		// fetch and send details back
		echo get_all_answers($ques);

	}else echo json_encode(array("success"=>"0","error"=>"Unexpected error occurred"));

}

function get_all_answers($qid){
	global $conn;
	// get all available answers
	$ans = answer_options($qid);
	$stmt = $conn->prepare("SELECT * FROM `poll_answers` where question_id = ?");
	$stmt->execute(array($qid));
	$stmt->setFetchMode(PDO::FETCH_ASSOC);  
	while($info = $stmt->fetch()){
		$answer_count++;
		$count[$info['answer_id']] += 1;
	}
	return json_encode(array("success" => "1","total" => "$answer_count","details" => $count,"opt"=>$ans));
}

function answer_options($qid){
	global $conn;

	$stmt = $conn->prepare("SELECT * FROM answers where question_id = ?");
	$stmt->execute(array($qid));
	$stmt->setFetchMode(PDO::FETCH_ASSOC);  
	while($info = $stmt->fetch()){
		$ans[$info['id']] = $info['answer'];
	}
	return $ans; 
}

?>