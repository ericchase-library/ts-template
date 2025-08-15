import { Builder } from './core/Builder.js';
import { Step_Bun_Run } from './core/step/Step_Bun_Run.js';

// This script pulls template lib files from template project.

const template_path = 'C:/Code/Base/JavaScript-TypeScript/@Template';

Builder.SetStartUpSteps(
  Step_Bun_Run({ cmd: ['bun', 'install'], showlogs: false }),
  // Step_FS_Mirror_Directory({
  //   from_path: NODE_PATH.join(template_path, 'tools/lib-'),
  //   to_path: NODE_PATH.join(Builder.Dir.Tools, 'lib-'),
  //   include_patterns: ['**/*'],
  // }),
  //
);

await Builder.Start();
