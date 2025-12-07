import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Reeves',
  description: 'AI-powered task management system for Claude Code',
  base: '/reeves/',

  ignoreDeadLinks: true,

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Examples', link: '/examples/real-world' },
      { text: 'API', link: '/api/tools' },
      { text: 'GitHub', link: 'https://github.com/dshanklin-bv/reeves' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'What is Reeves?', link: '/guide/what-is-reeves' },
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Installation', link: '/guide/installation' }
          ]
        },
        {
          text: 'Core Concepts',
          items: [
            { text: 'Tasks & Lifecycle', link: '/guide/tasks' },
            { text: 'Projects', link: '/guide/projects' },
            { text: 'Contacts', link: '/guide/contacts' },
            { text: 'Learning Logs', link: '/guide/learning-logs' },
            { text: 'Architecture', link: '/guide/architecture' }
          ]
        },
        {
          text: 'Usage',
          items: [
            { text: 'Creating Tasks', link: '/guide/creating-tasks' },
            { text: 'Managing Projects', link: '/guide/managing-projects' },
            { text: 'Message Sending', link: '/guide/message-sending' },
            { text: 'Best Practices', link: '/guide/best-practices' }
          ]
        },
        {
          text: 'Advanced',
          items: [
            { text: 'Data Management', link: '/guide/data-management' },
            { text: 'Scaling Strategy', link: '/guide/scaling' },
            { text: 'Security & Privacy', link: '/guide/security' },
            { text: 'Troubleshooting', link: '/guide/troubleshooting' }
          ]
        }
      ],

      '/examples/': [
        {
          text: 'Examples',
          items: [
            { text: 'Real-World Workflows', link: '/examples/real-world' },
            { text: 'Task Patterns', link: '/examples/task-patterns' },
            { text: 'Project Templates', link: '/examples/project-templates' },
            { text: 'Contact Management', link: '/examples/contact-management' }
          ]
        }
      ],

      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'MCP Tools', link: '/api/tools' },
            { text: 'Task Schema', link: '/api/task-schema' },
            { text: 'Project Schema', link: '/api/project-schema' },
            { text: 'Contact Schema', link: '/api/contact-schema' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/dshanklin-bv/reeves' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 Daniel Shanklin'
    },

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/dshanklin-bv/reeves/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    }
  }
})
