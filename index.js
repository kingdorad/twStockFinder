#!/usr/bin/env node 
const axios = require('axios');
const program = require('commander');
const url='https://tw.screener.finance.yahoo.net/screener/ws?f=j&ShowID=';

program
  .version('0.0.1')
  .option('-n, --name <name>', 'Your name.')
  .option('-s, --say','say World')
  .option('-f, --find <find>','find stock detail')
  .parse(process.argv);

	if(program.say)
	{
		console.log('say yes');
	}
	else if(program.find)
	{
		
		console.log('find stock number:',program.find);
		axios.get(url+program.find)
			.then(function(response){
				console.log('收盤價        漲跌       近一周        近三月');
				console.log(response.data.items[0].vFLD_CLOSE,'    '
							,response.data.items[0].vFLD_UP_DN,'     '
							,response.data.items[0].vFLD_CLOSE_WEEK,'        '
							,response.data.items[0].vFLD_CLOSE_SEASON);
		
				console.log('本益比        ROE        毛利率        EPS');
				console.log(response.data.items[0].vFLD_PER,'    '
							,response.data.items[0].vFLD_ROE,'   '
							,response.data.items[0].vFLD_PROFIT,'   '
							,response.data.items[0].vFLD_EPS);
			})
			.catch(function(error){

				console.log('error');
			});

	}
