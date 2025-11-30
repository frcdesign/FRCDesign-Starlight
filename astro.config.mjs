import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkGlossary from './src/plugins/remark-glossary';

export default defineConfig({
  markdown: {
    remarkPlugins: [remarkGlossary],
  },
  integrations: [
    starlight({
      title: 'FRCDesign.org',
      logo: {
        src: './src/assets/universal/book.svg',
        alt: 'FRCDesign.org logo',
      },
      customCss: [
        './src/styles/global.css',
      ],
      components: {
        Header: './src/starlightOverrides/Header.astro',
        Footer: './src/starlightOverrides/Footer.astro',
      },
      tableOfContents: false,
      sidebar: [
        {
          label: 'Learning Course',
          items: [
            {
              label: 'Course Setup',
              collapsed: true,
              items: [
                { label: 'New to CAD', slug: 'learning-course/course-setup/new-to-cad' },
                {
                  label: 'New to Onshape',
                  collapsed: true,
                  items: [
                    { label: 'Account Setup', slug: 'learning-course/course-setup/new-to-onshape/account-setup' },
                    { label: 'Performance Tuning', slug: 'learning-course/course-setup/new-to-onshape/performance-tuning' },
                    { label: 'Documents Page', slug: 'learning-course/course-setup/new-to-onshape/documents-page' },
                  ],
                },
                {
                  label: 'Required Course Tools',
                  collapsed: true,
                  items: [
                    { label: 'Part Library', slug: 'learning-course/course-setup/required-course-tools/part-library' },
                    { label: 'Custom Features', slug: 'learning-course/course-setup/required-course-tools/featurescripts' },
                  ],
                },
              ],
            },
            {
              label: 'Stage 1',
              collapsed: true,
              items: [
                { label: 'Course Introduction', slug: 'learning-course/stage1/introduction' },
                { label: 'Focusing on Improvement', slug: 'learning-course/stage1/1a/focusing-on-improvement' },
                {
                  label: 'A: Onshape Fundamentals',
                  collapsed: true,
                  items: [
                    {
                      label: 'Section 1: Part Studio Fundamentals',
                      collapsed: true,
                      items: [
                        { label: 'Intro & Setup', slug: 'learning-course/stage1/1a/section1-setup' },
                        { label: 'Exercise 0: Navigation', slug: 'learning-course/stage1/1a/section1-exercise0' },
                        { label: 'Exercise 1: First Tubes', slug: 'learning-course/stage1/1a/section1-exercise1' },
                        { label: 'Exercise 2: More Tubes', slug: 'learning-course/stage1/1a/section1-exercise2' },
                        { label: 'Exercise 3: Sketch Basics', slug: 'learning-course/stage1/1a/section1-exercise3' },
                        { label: 'Exercise 4: Drivetrain Frame', slug: 'learning-course/stage1/1a/section1-exercise4' },
                        { label: 'Exercise 5: Box Frame', slug: 'learning-course/stage1/1a/section1-exercise5' },
                        { label: 'Exercise 6: Triangle Frame', slug: 'learning-course/stage1/1a/section1-exercise6' },
                      ],
                    },
                    {
                      label: 'Section 2: Plates',
                      collapsed: true,
                      items: [
                        { label: 'Exercise 1: Plate Workflow', slug: 'learning-course/stage1/1a/section2-exercise1' },
                        { label: 'Exercise 2: Gusset', slug: 'learning-course/stage1/1a/section2-exercise2' },
                        { label: 'Exercise 3: Superstructure Gussets & Plate', slug: 'learning-course/stage1/1a/section2-exercise3' },
                        { label: 'Exercise 4: Motor Mounting', slug: 'learning-course/stage1/1a/section2-exercise4' },
                      ],
                    },
                    {
                      label: 'Section 3: Assemblies',
                      collapsed: true,
                      items: [
                        { label: 'Exercise 1: Rivets', slug: 'learning-course/stage1/1a/section3-exercise1' },
                        { label: 'Exercise 2: Swerve Drive', slug: 'learning-course/stage1/1a/section3-exercise2' },
                        { label: 'Exercise 3: Gusset Setup', slug: 'learning-course/stage1/1a/section3-exercise3' },
                        { label: 'Exercise 4: Full Frame', slug: 'learning-course/stage1/1a/section3-exercise4' },
                        { label: 'Exercise 5: Finishing the Frame', slug: 'learning-course/stage1/1a/section3-exercise5' },
                      ],
                    },
                  ],
                },
                {
                  label: 'B: Power Transmissions',
                  collapsed: true,
                  items: [
                    { label: 'Introduction', slug: 'learning-course/stage1/1b/introduction' },
                    { label: 'Motors', slug: 'learning-course/stage1/1b/motors' },
                    { label: 'Shafts and Bearings', slug: 'learning-course/stage1/1b/shafts-bearings' },
                    { label: 'Torque and Speed', slug: 'learning-course/stage1/1b/torque-speed' },
                    { label: 'Gear Basics', slug: 'learning-course/stage1/1b/gears' },
                    { label: 'Exercise 1: Simple Gearbox', slug: 'learning-course/stage1/1b/exercise1' },
                    { label: 'Exercise 2: Two Stage Gearbox', slug: 'learning-course/stage1/1b/exercise2' },
                    { label: 'Belt and Pulley Basics', slug: 'learning-course/stage1/1b/belts' },
                    { label: 'Chain and Sprocket Basics', slug: 'learning-course/stage1/1b/chain' },
                    { label: 'Exercise 3: Gear and Belt Gearbox', slug: 'learning-course/stage1/1b/exercise3' },
                    { label: 'Summary', slug: 'learning-course/stage1/1b/summary' },
                  ],
                },
                {
                  label: 'C: Practice Mechanisms',
                  collapsed: true,
                  items: [
                    { label: 'Introduction', slug: 'learning-course/stage1/1c/introduction' },
                    { label: 'Exercise Overview', slug: 'learning-course/stage1/1c/exercise-overview' },
                    { label: 'Exercise 1: Flat Intake', slug: 'learning-course/stage1/1c/exercise1' },
                    { label: 'Exercise 2: Dead Axle Rollers', slug: 'learning-course/stage1/1c/exercise2' },
                    { label: 'Exercise 3: Shooter', slug: 'learning-course/stage1/1c/exercise3' },
                    { label: 'Exercise 4: Telescoping Hook', slug: 'learning-course/stage1/1c/exercise4' },
                    { label: 'Exercise 5: Flipped Gearbox', slug: 'learning-course/stage1/1c/exercise5' },
                    { label: 'Exercise 6: Direction Swap', slug: 'learning-course/stage1/1c/exercise6' },
                    { label: 'Exercise 7: Vertical Rollers', slug: 'learning-course/stage1/1c/exercise7' },
                    { label: 'Exercise 8: Indexer Centering', slug: 'learning-course/stage1/1c/exercise8' },
                    { label: 'Summary', slug: 'learning-course/stage1/1c/summary' },
                  ],
                },
                {
                  label: 'D: Design Methodology',
                  collapsed: true,
                  items: [
                    { label: 'Introduction', slug: 'learning-course/stage1/1d/introduction' },
                    { label: 'Top Down Design', slug: 'learning-course/stage1/1d/top-down-design' },
                    { label: 'Project Overview', slug: 'learning-course/stage1/1d/project-overview' },
                    { label: 'Layout Sketch', slug: 'learning-course/stage1/1d/layout-sketch' },
                    { label: 'Part Studio', slug: 'learning-course/stage1/1d/part-modeling' },
                    { label: 'Assembly', slug: 'learning-course/stage1/1d/assembly-modeling' },
                    { label: 'Adding More Components', slug: 'learning-course/stage1/1d/adding-components' },
                    { label: 'Top Level Assembly', slug: 'learning-course/stage1/1d/top-level-assembly' },
                    { label: 'Summary', slug: 'learning-course/stage1/1d/summary' },
                  ],
                },
                {
                  label: 'E: Subsystem Workflow',
                  collapsed: true,
                  items: [
                    { label: 'Introduction', slug: 'learning-course/stage1/1e/introduction' },
                    { label: 'Project Overview', slug: 'learning-course/stage1/1e/project-overview' },
                    { label: 'Battery Mounting', slug: 'learning-course/stage1/1e/battery-mounting' },
                    { label: 'Exercise: Battery Holder', slug: 'learning-course/stage1/1e/exercise1' },
                    { label: 'Electronics', slug: 'learning-course/stage1/1e/electronics' },
                    { label: 'Exercise: Mounting Electronics', slug: 'learning-course/stage1/1e/exercise2' },
                    { label: 'Exercise: Bellypan Pocketing', slug: 'learning-course/stage1/1e/exercise3' },
                    { label: 'Exercise: Bumpers', slug: 'learning-course/stage1/1e/exercise4' },
                    { label: 'Exercise: Bumper Mounting', slug: 'learning-course/stage1/1e/exercise5' },
                    { label: 'Review & Summary', slug: 'learning-course/stage1/1e/review-summary' },
                  ],
                },
              ],
            },
            {
              label: 'Stage 2',
              collapsed: true,
              items: [
                {
                  label: 'A: Basic Shooter',
                  collapsed: true,
                  items: [
                    { label: 'Introduction', slug: 'learning-course/stage2/2a/introduction' },
                    { label: 'Project Overview', slug: 'learning-course/stage2/2a/project-overview' },
                    {
                      label: 'Engineering Concepts',
                      collapsed: true,
                      items: [
                        { label: 'Structure Rigidity', slug: 'learning-course/stage2/2a/structure-rigidity' },
                        { label: 'Ball Trajectory', slug: 'learning-course/stage2/2a/ball-trajectory' },
                        { label: 'Exit Velocity', slug: 'learning-course/stage2/2a/exit-velocity' },
                        { label: 'Compression & Wrap', slug: 'learning-course/stage2/2a/compression-wrap' },
                        { label: 'Spin Control', slug: 'learning-course/stage2/2a/spin-control' },
                        { label: 'Friction & Efficiency', slug: 'learning-course/stage2/2a/friction-efficiency' },
                      ],
                    },
                    { label: 'Layout Sketch', slug: 'learning-course/stage2/2a/layout-sketch' },
                    { label: 'Part Studio', slug: 'learning-course/stage2/2a/part-studio' },
                    { label: 'Assembly', slug: 'learning-course/stage2/2a/assembly' },
                    { label: 'Summary', slug: 'learning-course/stage2/2a/summary' },
                  ],
                },
                {
                  label: 'B: Dead Axle Pivot',
                  collapsed: true,
                  items: [
                    { label: 'Introduction', slug: 'learning-course/stage2/2b/introduction' },
                    { label: 'Project Overview', slug: 'learning-course/stage2/2b/project-overview' },
                    {
                      label: 'Engineering Concepts',
                      collapsed: true,
                      items: [
                        { label: 'Strength', slug: 'learning-course/stage2/2b/strength' },
                        { label: 'Friction', slug: 'learning-course/stage2/2b/friction' },
                        { label: 'Power Transmission', slug: 'learning-course/stage2/2b/power-transmission' },
                        { label: 'Tensioning', slug: 'learning-course/stage2/2b/tensioning' },
                        { label: 'Backlash', slug: 'learning-course/stage2/2b/backlash' },
                      ],
                    },
                    { label: 'Layout Sketch', slug: 'learning-course/stage2/2b/layout-sketch' },
                    { label: 'Part Studio', slug: 'learning-course/stage2/2b/part-studio' },
                    { label: 'Assembly', slug: 'learning-course/stage2/2b/assembly' },
                    { label: 'Summary', slug: 'learning-course/stage2/2b/summary' },
                  ],
                },
                {
                  label: 'C: Slapdown Intake',
                  collapsed: true,
                  items: [
                    { label: 'Introduction', slug: 'learning-course/stage2/2c/introduction' },
                    { label: 'Project Overview', slug: 'learning-course/stage2/2c/project-overview' },
                    {
                      label: 'Engineering Concepts',
                      collapsed: true,
                      items: [
                        { label: 'Intake Golden Rules', slug: 'learning-course/stage2/2c/intake-golden-rules' },
                        { label: 'Robustness', slug: 'learning-course/stage2/2c/robustness' },
                        { label: 'Pivot', slug: 'learning-course/stage2/2c/pivot' },
                        { label: 'Rollers', slug: 'learning-course/stage2/2c/rollers' },
                        { label: 'Zombie Axles', slug: 'learning-course/stage2/2c/zombie-axles' },
                      ],
                    },
                    { label: 'Layout Sketch', slug: 'learning-course/stage2/2c/layout-sketch' },
                    { label: 'Part Studio', slug: 'learning-course/stage2/2c/part-studio' },
                    { label: 'Assembly', slug: 'learning-course/stage2/2c/assembly' },
                    { label: 'Summary', slug: 'learning-course/stage2/2c/summary' },
                  ],
                },
                {
                  label: 'D: Cascade Elevator',
                  collapsed: true,
                  items: [
                    { label: 'Introduction', slug: 'learning-course/stage2/2d/introduction' },
                    { label: 'Project Overview', slug: 'learning-course/stage2/2d/project-overview' },
                    {
                      label: 'Engineering Concepts',
                      collapsed: true,
                      items: [
                        { label: 'Elevator Blocks', slug: 'learning-course/stage2/2d/elevator-blocks' },
                        { label: 'Chain Attachment', slug: 'learning-course/stage2/2d/chain-attachment' },
                        { label: 'Rigging', slug: 'learning-course/stage2/2d/rigging' },
                        { label: 'Cable Clamp', slug: 'learning-course/stage2/2d/cable-clamp' },
                        { label: 'Cable Ends', slug: 'learning-course/stage2/2d/cable-ends' },
                        { label: 'Gearbox', slug: 'learning-course/stage2/2d/drive-system' },
                      ],
                    },
                    { label: 'Layout Sketch', slug: 'learning-course/stage2/2d/layout-sketch' },
                    { label: 'Part Studio', slug: 'learning-course/stage2/2d/part-studio' },
                    { label: 'Assembly', slug: 'learning-course/stage2/2d/assembly' },
                    { label: 'Summary', slug: 'learning-course/stage2/2d/summary' },
                  ],
                },
              ],
            },
            { label: 'Stage 3', slug: 'learning-course/stage3/3a/introduction' },
            { label: 'Stage 4', slug: 'learning-course/stage4' },
          ],
        },
      ],
    }),
  ],
});
