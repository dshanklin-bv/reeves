<template>
  <div class="copy-markdown-container">
    <button @click="copyMarkdown" class="copy-markdown-btn" :class="{ copied }">
      <span v-if="!copied">📋 Copy Markdown</span>
      <span v-else>✓ Copied!</span>
    </button>
    <a :href="markdownUrl" class="view-markdown-link" target="_blank">
      View Raw .md
    </a>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useData } from 'vitepress'

const { page } = useData()
const copied = ref(false)

const markdownUrl = computed(() => {
  const path = page.value.filePath
  return `https://raw.githubusercontent.com/dshanklin-bv/reeves/main/docs/${path}`
})

const copyMarkdown = async () => {
  try {
    const response = await fetch(markdownUrl.value)
    const text = await response.text()
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>

<style scoped>
.copy-markdown-container {
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  margin: 2rem 0;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.copy-markdown-btn {
  padding: 0.5rem 1rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.copy-markdown-btn:hover {
  background: var(--vp-c-brand-dark);
}

.copy-markdown-btn.copied {
  background: var(--vp-c-green);
}

.view-markdown-link {
  color: var(--vp-c-brand);
  text-decoration: none;
  font-weight: 500;
}

.view-markdown-link:hover {
  text-decoration: underline;
}
</style>
