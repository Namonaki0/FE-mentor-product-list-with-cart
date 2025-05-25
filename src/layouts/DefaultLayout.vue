<template>
    <div class='p-4 outer-container'>
        <slot />
    </div>
</template>
<style scoped>
@media (min-width: 1024px) {
    .outer-container {
        display: flex;
    }
}
</style>