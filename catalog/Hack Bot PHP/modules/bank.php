<?php
function Bank($op = false, $summ){
	global $UserInfo,$Nick;

	$uBank = json_decode($UserInfo['bank'],1);
		$summ = $summ == 'все' || $summ == 'всё' ? $uBank['balance'] : KKK($summ);
	if(empty($op) && empty($summ)){
		$message = ', в банке: '.ConvertValute($uBank['balance']).'$';
		return $Nick.$message;
	}
	if($op == 'снять'){
		if($summ>0){
			if($uBank['balance'] >= $summ){
				SetFieldF('dollar',$UserInfo['dollar']+$summ);
				$uBank['time'] = time();
				$uBank['balance'] -= $summ;
				SetFieldF('bank',json_encode($uBank,JSON_UNESCAPED_UNICODE));
				$message = ', вы сняли со своего банковского счёта: '.ConvertValute($summ).'$<br>'.
				'Остаток: '.ConvertValute($uBank['balance']).'$';
			}else{
				$message = ', на вашем банковском счёте нехватает денег.';
			}
		}else{
			$message = ', минимальная сумма 1$.';
		}
	}elseif(KKK($op)>=0){
		$summ = KKK($op);
		
		$summ = $summ<=0 ? 1 : $summ;
		if($uBank['balance']+$summ>KKK('250kk')){
			return $Nick.', ваш банк полон.';
		}
		$summ = $uBank['balance']+$summ>KKK('250kk') ? KKK('250kk')-$uBank['balance'] : $summ;

		if($summ >0){

			if($UserInfo['dollar'] >= $summ){
				$uBank['balance']+=$summ;
				$uBank['time'] = time();
				SetFieldF('dollar',$UserInfo['dollar']-$summ);
				SetFieldF('bank',json_encode($uBank,JSON_UNESCAPED_UNICODE));
				$message = ', вы положили на свой банковский счёт: '.ConvertValute($summ).'$<br>'.
				'В банке: '.ConvertValute($uBank['balance']).'$';
			}else{
				$message = ', недостаточно денег.';
			}
		}else{
			$message = ', минимальная сумма вклада 1$.';
		}
	}
	return $Nick.$message;
}
?>