#!/usr/bin/env node 
const axios = require('axios');
const program = require('commander');
const fs=require('file-system');
const url='https://tw.screener.finance.yahoo.net/screener/ws?f=j&ShowID=';

program
  .version('0.0.1')
  .option('-s, --save <save>','save stock number')
  .option('-f, --find <find>','find stock detail')
  .parse(process.argv);

	if(program.save)
	{
		// fs.readFile('stock-number.txt', function (err, data) {
  //  		if (err) throw err;

  //  		 console.log(data.toString());
  //  		 });
  		fs.writeFile('stock-number.txt',program.save,function(err){

  			if(err)
  			{
  				console.log(err);
  			}
  			else
  			{
  				console.log('save stock number',program.save);
  			}
  		})
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

