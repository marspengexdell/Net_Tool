<template>
  <div class="three-column-cards">
    <div
      v-for="(block, index) in layer.contentBlocks"
      :key="index"
      class="card"
    >
      <img
        v-if="block.metadata && block.metadata.image"
        :src="block.metadata.image"
        :alt="block.metadata.heading || 'Card image'"
        class="card-image"
      />
      <h3 v-if="block.metadata && block.metadata.heading" class="card-heading">
        {{ block.metadata.heading }}
      </h3>
      <p v-if="block.metadata && block.metadata.paragraph" class="card-paragraph">
        {{ block.metadata.paragraph }}
      </p>
    </div>
  </div>
</template>

<script setup>
// 接收父组件传入的 layer 数据
defineProps({
  layer: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.three-column-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  text-align: center;
}

.card-image {
  width: 100%;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.card-heading {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #333;
}

.card-paragraph {
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .three-column-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .three-column-cards {
    grid-template-columns: 1fr;
  }
}
</style>
