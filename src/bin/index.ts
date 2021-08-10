import path from 'path';
import process from 'process';
import { program } from 'commander';
import { startServer } from './lib/run';

// program.version(version, '-v, --version')

program
  .command('dev [projectDir]')
  .option('-p, --port <number>', 'dev server port')
  .action((entry, cmd) => {
    console.log('dev: process.cwd() =', process.cwd());
    console.log('entry, cmd 1111 =', entry, cmd)
    const port = cmd.port || '8080';
    const projectDir = path.join(process.cwd(), entry || '');
    const binModuleDir = path.join(process.cwd());
    startServer({
      port: parseInt(port),
      binModuleDir: binModuleDir,
      projectDir: projectDir,
    });
  })
      
program
  .command('build [projectDir]')
  .action((entry, cmd) => {
    // const port = cmd.port
    console.log('build: process.cwd() =', process.cwd());
    console.log(entry, cmd);
    // startServer({
    //   port: parseInt(port),
    // });
  })

program
  .command('serve [projectDir]')
  .option('-p, --port <number>', 'dev server port')
  .action((entry, cmd) => {
    console.log('serve ========', entry, cmd.port);
    // runServer();
  })


program.parse(process.argv);