#!/bin/bash

# Reeves Documentation Test Suite
# Validates all documentation, configuration, and deployment

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counters
PASSED=0
FAILED=0
TOTAL=0

# Test function
test_assertion() {
    local test_name="$1"
    local condition="$2"
    TOTAL=$((TOTAL + 1))

    if eval "$condition"; then
        echo -e "${GREEN}✓${NC} $test_name"
        PASSED=$((PASSED + 1))
        return 0
    else
        echo -e "${RED}✗${NC} $test_name"
        FAILED=$((FAILED + 1))
        return 1
    fi
}

echo "=========================================="
echo "Reeves Documentation Test Suite"
echo "=========================================="
echo ""

# ==========================================
# 1. Repository Structure Tests
# ==========================================
echo "1. Testing Repository Structure..."
echo ""

test_assertion "Root directory exists" "[ -d '/Users/dshanklinbv/repos/reeves' ]"
test_assertion "MCP server directory exists" "[ -d 'mcp-server' ]"
test_assertion "Docs directory exists" "[ -d 'docs' ]"
test_assertion "Templates directory exists" "[ -d 'templates' ]"
test_assertion "Examples directory exists" "[ -d 'examples' ]"
test_assertion "Schemas directory exists" "[ -d 'schemas' ]"
test_assertion ".gitignore exists" "[ -f '.gitignore' ]"
test_assertion "README.md exists" "[ -f 'README.md' ]"
test_assertion "ARCHITECTURE.md exists" "[ -f 'ARCHITECTURE.md' ]"
test_assertion "LICENSE exists" "[ -f 'LICENSE' ]"

echo ""

# ==========================================
# 2. Documentation Structure Tests
# ==========================================
echo "2. Testing Documentation Structure..."
echo ""

test_assertion "VitePress config exists" "[ -f 'docs/.vitepress/config.js' ]"
test_assertion "Homepage exists" "[ -f 'docs/index.md' ]"
test_assertion "AI Index exists" "[ -f 'docs/ai-index.md' ]"
test_assertion "AI Assistant Guide exists" "[ -f 'docs/guide/ai-assistant-guide.md' ]"
test_assertion "What is Reeves exists" "[ -f 'docs/guide/what-is-reeves.md' ]"
test_assertion "Getting Started exists" "[ -f 'docs/guide/getting-started.md' ]"
test_assertion "Installation guide exists" "[ -f 'docs/guide/installation.md' ]"

echo ""

# ==========================================
# 3. VitePress Theme Tests
# ==========================================
echo "3. Testing VitePress Theme..."
echo ""

test_assertion "Theme index.ts exists" "[ -f 'docs/.vitepress/theme/index.ts' ]"
test_assertion "CopyMarkdownButton.vue exists" "[ -f 'docs/.vitepress/theme/components/CopyMarkdownButton.vue' ]"
test_assertion "Custom CSS exists" "[ -f 'docs/.vitepress/theme/custom.css' ]"

echo ""

# ==========================================
# 4. MCP Server Tests
# ==========================================
echo "4. Testing MCP Server..."
echo ""

test_assertion "package.json exists" "[ -f 'mcp-server/package.json' ]"
test_assertion "tsconfig.json exists" "[ -f 'mcp-server/tsconfig.json' ]"
test_assertion "src directory exists" "[ -d 'mcp-server/src' ]"
test_assertion "index.ts exists" "[ -f 'mcp-server/src/index.ts' ]"
test_assertion "tools.ts exists" "[ -f 'mcp-server/src/tools.ts' ]"
test_assertion "task-manager.ts exists" "[ -f 'mcp-server/src/task-manager.ts' ]"
test_assertion "queue-manager.ts exists" "[ -f 'mcp-server/src/queue-manager.ts' ]"
test_assertion "dist directory exists (built)" "[ -d 'mcp-server/dist' ]"
test_assertion "dist/index.js exists (compiled)" "[ -f 'mcp-server/dist/index.js' ]"

echo ""

# ==========================================
# 5. GitHub Workflows Tests
# ==========================================
echo "5. Testing GitHub Workflows..."
echo ""

test_assertion "Workflows directory exists" "[ -d '.github/workflows' ]"
test_assertion "Deploy docs workflow exists" "[ -f '.github/workflows/deploy-docs.yml' ]"

echo ""

# ==========================================
# 6. Package Configuration Tests
# ==========================================
echo "6. Testing Package Configuration..."
echo ""

test_assertion "Root package.json exists" "[ -f 'package.json' ]"
test_assertion "package-lock.json exists" "[ -f 'package-lock.json' ]"
test_assertion "node_modules exists" "[ -d 'node_modules' ]"

# Check package.json has docs scripts
if [ -f "package.json" ]; then
    test_assertion "docs:dev script exists" "grep -q '\"docs:dev\"' package.json"
    test_assertion "docs:build script exists" "grep -q '\"docs:build\"' package.json"
    test_assertion "docs:preview script exists" "grep -q '\"docs:preview\"' package.json"
fi

echo ""

# ==========================================
# 7. Git Configuration Tests
# ==========================================
echo "7. Testing Git Configuration..."
echo ""

test_assertion ".gitignore protects user data" "grep -q 'tasks.json' .gitignore"
test_assertion ".gitignore protects projects" "grep -q 'projects.json' .gitignore"
test_assertion ".gitignore protects learning-logs" "grep -q 'learning-logs/' .gitignore"
test_assertion ".gitignore protects artifacts" "grep -q 'artifacts/' .gitignore"
test_assertion ".gitignore protects life-data" "grep -q 'life-data/' .gitignore"
test_assertion ".gitignore has VitePress cache" "grep -q 'docs/.vitepress/cache/' .gitignore"
test_assertion ".gitignore has VitePress dist" "grep -q 'docs/.vitepress/dist/' .gitignore"

echo ""

# ==========================================
# 8. Template Files Tests
# ==========================================
echo "8. Testing Template Files..."
echo ""

test_assertion "tasks.json template exists" "[ -f 'templates/tasks.json.template' ]"
test_assertion "projects.json template exists" "[ -f 'templates/projects.json.template' ]"
test_assertion "contacts.json template exists" "[ -f 'templates/contacts.json.template' ]"

echo ""

# ==========================================
# 9. Content Validation Tests
# ==========================================
echo "9. Testing Documentation Content..."
echo ""

# Check key content exists in files
test_assertion "README has time savings" "grep -q '50+ minutes saved' README.md"
test_assertion "README has intentional simplicity" "grep -q 'Intentionally Simple' README.md"
test_assertion "ARCHITECTURE has message protocol" "grep -q 'Message Sending Protocol' ARCHITECTURE.md"
test_assertion "ARCHITECTURE has double-verify" "grep -q 'Double-Verify' ARCHITECTURE.md"
test_assertion "AI Guide has tool signatures" "grep -qi 'typescript' docs/guide/ai-assistant-guide.md"
test_assertion "AI Index has raw links" "grep -q 'raw.githubusercontent.com' docs/ai-index.md"

echo ""

# ==========================================
# 10. VitePress Build Test
# ==========================================
echo "10. Testing VitePress Build..."
echo ""

# Try to build (will show which pages are missing)
if npm run docs:build 2>&1 | tee /tmp/vitepress-build.log; then
    test_assertion "VitePress build succeeds" "true"
    test_assertion "Build creates dist directory" "[ -d 'docs/.vitepress/dist' ]"
else
    test_assertion "VitePress build succeeds" "false"
    echo ""
    echo -e "${YELLOW}Build failed. Missing pages:${NC}"
    grep "dead link" /tmp/vitepress-build.log | sed 's/^/  /'
fi

echo ""

# ==========================================
# 11. Configuration Validation Tests
# ==========================================
echo "11. Testing Configuration Files..."
echo ""

# Validate JSON files
if command -v python3 &> /dev/null; then
    test_assertion "package.json is valid JSON" "python3 -m json.tool package.json > /dev/null 2>&1"
    test_assertion "package-lock.json is valid JSON" "python3 -m json.tool package-lock.json > /dev/null 2>&1"
    test_assertion "tasks template is valid JSON" "python3 -m json.tool templates/tasks.json.template > /dev/null 2>&1"
    test_assertion "projects template is valid JSON" "python3 -m json.tool templates/projects.json.template > /dev/null 2>&1"
    test_assertion "contacts template is valid JSON" "python3 -m json.tool templates/contacts.json.template > /dev/null 2>&1"
else
    echo -e "${YELLOW}⊘${NC} Skipping JSON validation (python3 not found)"
fi

echo ""

# ==========================================
# 12. Git Status Tests
# ==========================================
echo "12. Testing Git Status..."
echo ""

test_assertion "Git repository initialized" "[ -d '.git' ]"
test_assertion "Remote origin configured" "git remote get-url origin > /dev/null 2>&1"
test_assertion "On main branch" "[ \"\$(git branch --show-current)\" = 'main' ]"

# Check no private data in git
test_assertion "No tasks.json in git" "! git ls-files | grep -q '^tasks.json$'"
test_assertion "No contacts.json in git" "! git ls-files | grep -q 'contacts.json$'"
test_assertion "No learning-logs in git" "! git ls-files | grep -q '^learning-logs/'"
test_assertion "No artifacts in git" "! git ls-files | grep -q '^artifacts/'"

echo ""

# ==========================================
# Test Summary
# ==========================================
echo "=========================================="
echo "Test Summary"
echo "=========================================="
echo ""
echo -e "Total Tests:  ${TOTAL}"
echo -e "${GREEN}Passed:       ${PASSED}${NC}"
if [ $FAILED -gt 0 ]; then
    echo -e "${RED}Failed:       ${FAILED}${NC}"
else
    echo -e "Failed:       ${FAILED}"
fi
echo ""

# Calculate percentage
if [ $TOTAL -gt 0 ]; then
    PERCENTAGE=$((PASSED * 100 / TOTAL))
    echo "Success Rate: ${PERCENTAGE}%"
    echo ""
fi

# Exit code
if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}All tests passed! ✓${NC}"
    exit 0
else
    echo -e "${RED}Some tests failed. See above for details.${NC}"
    exit 1
fi
