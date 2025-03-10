import { Builder } from 'tools/lib/Builder.js';
import { BuildStep_BunInstall } from 'tools/lib/steps/Bun-Install.js';
import { BuildStep_IOFormat } from 'tools/lib/steps/IO-Format.js';

const builder = new Builder(Bun.argv[2] === '--watch' ? 'watch' : 'build');

builder.setStartupSteps([
  BuildStep_BunInstall(),
  BuildStep_IOFormat(),
  //
]);

builder.setProcessorModules([
  //
]);

await builder.start();
