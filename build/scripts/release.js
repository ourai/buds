#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const execSync = require("child_process").execSync;

const pkg = require("../../package.json");
const DIST_DIR = `../${pkg.name}-dist`;

const rootPath = path.resolve(__dirname, "../..");
const releasePath = path.resolve(rootPath, DIST_DIR);

execSync("rm -rf css/ && rm -rf scss/ && rm -rf bower.json && rm -rf *.md", {cwd: releasePath});
execSync(`cp -R dist/ ${DIST_DIR} && cp bower.json ${DIST_DIR} && cp *.md ${DIST_DIR}`, {cwd: rootPath});
execSync(`git add . && git commit -m "Built on ${new Date()}" && git tag -a v${pkg.version} -m "${pkg.version}" && git push --tags && git push --all`, {cwd: releasePath});
