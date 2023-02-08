<template>
    <svg class="iconpark-icon svg-icon" aria-hidden="true">
        <use :href="iconName" />
    </svg>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
export default defineComponent({
    name: 'SvgIcon',
    props: {
        iconClass: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        const iconName = computed(() => {
            return `#${props.iconClass}`;
        });
        return {
            iconName,
        };
    },
});
</script>

<style scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
.svg-external-icon {
    background-color: currentColor;
    mask-size: cover !important;
    display: inline-block;
}
</style>
