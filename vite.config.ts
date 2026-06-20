import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'
import { execFileSync } from 'child_process'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

function resolveDeploymentCommit() {
  const candidates = [
    ['DEPLOYMENT_COMMIT_SHA', process.env.DEPLOYMENT_COMMIT_SHA],
    ['CF_PAGES_COMMIT_SHA', process.env.CF_PAGES_COMMIT_SHA],
    ['GITHUB_SHA', process.env.GITHUB_SHA],
  ]

  for (const [name, candidate] of candidates) {
    const value = candidate?.trim()
    if (!value) continue
    if (!/^[0-9a-f]{40}$/i.test(value)) {
      throw new Error(`${name} must contain a full Git SHA`)
    }
    return value.toLowerCase()
  }

  const localCommit = execFileSync('git', ['rev-parse', 'HEAD'], {
    encoding: 'utf8',
    windowsHide: true,
  }).trim()

  if (!/^[0-9a-f]{40}$/i.test(localCommit)) {
    throw new Error('Unable to resolve a full Git SHA for deployment-version.json')
  }

  return localCommit.toLowerCase()
}

function deploymentVersionArtifact() {
  return {
    name: 'deployment-version-artifact',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'deployment-version.json',
        source: `${JSON.stringify({ commit: resolveDeploymentCommit() }, null, 2)}\n`,
      })
    },
  }
}

function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        const assetsPath = path.resolve(__dirname, 'src/assets', filename)
        const importsPath = path.resolve(__dirname, 'src/imports', filename)
        return fs.existsSync(assetsPath) ? assetsPath : importsPath
      }
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [
    figmaAssetResolver(),
    deploymentVersionArtifact(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
