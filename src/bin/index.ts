import process from 'process';
import { program } from 'commander';
import { startServer } from './lib/run';

// program.version(version, '-v, --version')


program
  .command('dev [projectDir]')
  .option('-p, --port <number>', 'dev server port')
  .action((entry, cmd) => {
    // console.log('dev: process.cwd() =', process.cwd())
    const port = cmd.port || '8080';
    startServer({
      port: parseInt(port),
    });
  })
      
program
  .command('build [projectDir]')
  .action((entry, cmd) => {
    const port = cmd.port
    startServer({
      port: parseInt(port),
    });
  })

program
  .command('serve [projectDir]')
  .option('-p, --port <number>', 'dev server port')
  .action((entry, cmd) => {
    console.log('serve ========', entry, cmd.port);
    // runServer();
  })


program.parse(process.argv);