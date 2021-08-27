let res = context.$match[1]
while(res.includes(`к`)){
	res = res.replace(`к`,`000`)
}
while(res.includes(`k`)){
	res = res.replace(`k`,`000`)
}
while(res.includes(`.`)){
	res = res.replace(`.`,``)
}
while(res.includes(`-`)){
	res = res.replace(`-`,``)
}
while(res.includes(`,`)){
	res = res.replace(`,`,``)
}
if(res.includes(`все`) || res.includes(`всё`) || res.includes(`all`)){
	res = user.bananas
	
	}