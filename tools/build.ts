import { Builder } from 'tools/lib/Builder.js';
import { Step_Bun_Run } from 'tools/lib/steps/Bun-Run.js';
import { Step_CleanDirectory } from 'tools/lib/steps/FS-CleanDirectory.js';
import { Step_Format } from 'tools/lib/steps/FS-Format.js';

const builder = new Builder(Bun.argv[2] === '--watch' ? 'watch' : 'build');

builder.setStartupSteps([
  Step_Bun_Run({ cmd: ['bun', 'install'] }),
  Step_CleanDirectory(builder.dir.out),
  Step_Format(),
  //
]);

builder.setProcessorModules([
  //
]);

builder.setCleanupSteps([
  //
]);

await builder.start();
