import { Builder } from 'tools/lib/Builder.js';
import { BuildStep_BunInstall } from 'tools/lib/steps/Bun-Install.js';
import { BuildStep_FSFormat } from 'tools/lib/steps/FS-Format.js';

const builder = new Builder(Bun.argv[2] === '--watch' ? 'watch' : 'build');

builder.setStartupSteps([
  BuildStep_BunInstall('quiet'),
  BuildStep_FSFormat('quiet'),
  //
]);

builder.setProcessorModules([
  //
]);

await builder.start();
