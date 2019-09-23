// Electron
const {app, Menu} = require('electron').remote;
const shell = require('electron').shell;

// Stores
import {viewMode} from '../stores/muthur';

// Utils
import exportData from './export';

const menuTemplate = (create, input) => [
  {
    label: app.getName(),
    submenu: [
      {
        label: 'About',
        click: () => shell.openExternal('https://person0b.itch.io/muthur')
      },
      {
        label: 'Source',
        click: () => shell.openExternal('https://github.com/person0b/Muthur')
      },
      {type: 'separator'},
      {role: 'togglefullscreen'},
      {role: 'hide'},
      {type: 'separator'},
      {role: 'quit'}
      // {role: 'reload'},
      // {role: 'toggledevtools'}
    ]
  },
  ...(input
    ? [
        {
          label: 'Edit',
          submenu: [
            {role: 'cut'},
            {role: 'copy'},
            {role: 'paste'},
            {type: 'separator'},
            {role: 'selectAll'}
          ]
        }
      ]
    : []),
  ...(create
    ? [
        {
          label: 'Create',
          submenu: [
            {
              label: 'Project',
              click: () => viewMode.set(`createProject`),
              accelerator: 'CmdOrCtrl+p'
            },
            {
              label: 'Task',
              click: () => viewMode.set(`createTask`),
              accelerator: 'CmdOrCtrl+t'
            },
            {
              label: 'Log',
              click: () => viewMode.set(`createLog`),
              accelerator: 'CmdOrCtrl+l'
            }
          ]
        }
      ]
    : []),
  ...(create
    ? [
        {
          label: 'Data',
          submenu: [
            {
              label: 'Export',
              click: () => exportData(),
              accelerator: 'CmdOrCtrl+s'
            }
          ]
        }
      ]
    : [])
];

export default (create, input) =>
  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate(create, input)));
