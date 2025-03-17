import { Builder } from 'tools/lib/Builder.js';
import { Step_Bun_Run } from 'tools/lib/steps/Bun-Run.js';
import { Step_StartServer } from 'tools/lib/steps/Dev-StartServer.js';
import { Step_CleanDirectory } from 'tools/lib/steps/FS-CleanDirectory.js';
import { Step_Format } from 'tools/lib/steps/FS-Format.js';

// Use command line arguments to set watch mode.
const builder = new Builder(Bun.argv[2] === '--watch' ? 'watch' : 'build');

// During "dev" mode (when "--watch" is passed as an argument), the dev server
// will start running with hot refreshing if enabled in your index file.
builder.setStartupSteps([
  Step_Bun_Run({ cmd: ['bun', 'install'] }),
  Step_CleanDirectory(builder.dir.out),
  Step_Format(),
  Step_StartServer(),
  //
]);

builder.setProcessorModules([
  //
]);

builder.setCleanupSteps([
  //
]);

await builder.start();
