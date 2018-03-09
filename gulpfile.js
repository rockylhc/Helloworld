var gulp = require('gulp'),
    args = require('yargs').argv,
    exec = require('child_process').execSync,
    log = require('fancy-log');

gulp.task('BuildDockerImage',function(){
	exec('cat pwd.txt | docker login --username rockylhc --password-stdin');
	exec('docker build -f Dockerfile -t rockylhc/nginxweb:' + args.buildversion +' -t rockylhc/nginxweb:latest --rm --no-cache .', function (err,outlog,errlog){
		console.log(outlog);
		console.log(errlog);
	});
})

gulp.task('PushImage',['BuildDockerImage'],function(){
	exec('docker push rockylhc/nginxweb:' + args.buildversion, function (err,outlog,errlog){
		console.log(outlog);
		console.log(errlog);
	});
	exec('docker push rockylhc/nginxweb:latest', function (err,outlog,errlog){
		console.log(outlog);
		console.log(errlog);
	});
})
//這段是for play-with-docker特別寫的 與實際server ssh不同
gulp.task('SSHServer',['PushImage'],function() {
	exec('ssh ip172-18-0-4-bah2u2kprd20009cq4pg@direct.labs.play-with-docker.com -Y -tt');
})

gulp.task('UpdateDockerCompose',['SSHServer'],function() {;
	exec('docker-compose pull web','docker-compose up -d --no-deps --build web');
})

gulp.task('Deploy.stg',['UpdateDockerCompose']);