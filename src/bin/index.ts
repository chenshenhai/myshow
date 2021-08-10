import process from 'process';
import { program } from 'commander'

// program.version(version, '-v, --version')


program
  .command('dev [projectDir]')
  .option('-p, --port <number>', 'dev server port')
  .action((entry, cmd) => {
    console.log('dev: process.cwd() =', process.cwd())
  })
      
program
  .command('build [projectDir]')
  .action((entry, cmd) => {
    // TODO
    console.log('build ========', entry, cmd.port);
    // runBuildTheme(entry);
  })

program
  .command('serve [projectDir]')
  .option('-p, --port <number>', 'dev server port')
  .action((entry, cmd) => {
    console.log('serve ========', entry, cmd.port);
    // runServer();
  })


program.parse(process.argv);