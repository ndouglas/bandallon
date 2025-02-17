import { spawn } from 'child_process';
import { ChildProcess } from 'child_process';
import * as path from 'path';
import axios from 'axios';

const serverPath = path.join(__dirname, '..', '..', '..', 'server');

const run = (port: number): ChildProcess => {
  const command = `PORT=${port} npm run start:dev`;
  const child = spawn(command, {
    cwd: serverPath,
    shell: true,
  });
  return child;
};
export { run };

const wait = async (port: number): Promise<void> => {
  let tries = 0;
  while (tries < 10) {
    try {
      await axios.get(`http://localhost:${port}`);
      return;
    } catch (e) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      tries++;
    }
  }
  throw new Error('Server did not start in time');
};
export { wait };

const kill = (child: ChildProcess): void => {
  child.kill('SIGTERM');
};
export { kill };
