import { Builder } from 'tools/lib/Builder.js';
import { Step_Bun_Run } from 'tools/lib/steps/Bun-Run.js';
import { Step_StartServer } from 'tools/lib/steps/Dev-StartServer.js';
import { Step_CleanDirectory } from 'tools/lib/steps/FS-CleanDirectory.js';
import { Step_Format } from 'tools/lib/steps/FS-Format.js';

// Use command line arguments to set watch mode.
const builder = new Builder(Bun.argv[2] === '--watch' ? 'watch' : 'build');

// These steps are run during the startup phase only.
builder.setStartupSteps([
  Step_Bun_Run({ cmd: ['bun', 'install'] }, 'quiet'),
  Step_CleanDirectory(builder.dir.out),
  Step_Format('quiet'),
  //
]);

// These steps are run before each processing phase.
builder.setBeforeProcessingSteps([]);

// The processors are run for every file that added them during every
// processing phase.
builder.setProcessorModules([]);

// These steps are run after each processing phase.
builder.setAfterProcessingSteps([
  // During "dev" mode (when "--watch" is passed as an argument), the server
  // will start running with hot refreshing if enabled in your index file.
  Step_StartServer(),
  //
]);

// These steps are run during the shutdown phase only.
builder.setCleanupSteps([]);

await builder.start();
