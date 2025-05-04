import { BunPlatform } from '../src/lib/ericchase/platform-bun.js';
import { Builder } from './core/Builder.js';
import { Step_Bun_Run } from './core/step/Step_Bun_Run.js';
import { Step_Dev_Format } from './core/step/Step_Dev_Format.js';
import { Step_Dev_Lint } from './core/step/Step_Dev_Lint.js';
import { Step_FS_Clean_Directory } from './core/step/Step_FS_Clean_Directory.js';
import { Step_Dev_Server } from './lib-web/step/Step_Dev_Server.js';

const builder = Builder({
  mode: BunPlatform.Args.Has('--dev') ? Builder.BUILD_MODE.DEV : Builder.BUILD_MODE.BUILD,
  verbosity: Builder.LOG_VERBOSITY._1_LOG,
});

// These steps are run during the startup phase only.
builder.setStartUpSteps(
  Step_Bun_Run({ cmd: ['bun', 'update', '--latest'], showlogs: false }),
  Step_Bun_Run({ cmd: ['bun', 'install'], showlogs: false }),
  Step_FS_Clean_Directory(builder.dir.out),
  Step_Dev_Format({ showlogs: false }),
  Step_Dev_Lint({ showlogs: false }),
  //
);

// These steps are run before each processing phase.
builder.setBeforeProcessingSteps();

// The processors are run for every file that added them during every processing phase.
builder.setProcessorModules();

// These steps are run after each processing phase.
builder.setAfterProcessingSteps(
  Step_Dev_Server(),
  //
);

// These steps are run during the shutdown phase only.
builder.setCleanUpSteps();

await builder.start();
