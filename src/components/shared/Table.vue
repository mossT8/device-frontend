<template>
    <div class="table-wrapper">
        <table class="table">
            <thead>
                <tr>
                    <th v-for="column in columns" :key="column.key" class="table-header">
                        {{ column.label }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="loading" class="table-row">
                    <td :colspan="columns.length" class="table-cell">
                        Loading...
                    </td>
                </tr>
                <tr v-else-if="items.length === 0" class="table-row">
                    <td :colspan="columns.length" class="table-cell">
                        No items found
                    </td>
                </tr>
                <slot :items="items"></slot>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export interface TableColumn {
    key: string;
    label: string;
    align?: 'left' | 'right';
}

export default defineComponent({
    name: 'SharedTable',
    props: {
        columns: {
            type: Array as PropType<TableColumn[]>,
            required: true
        },
        items: {
            type: Array as PropType<any[]>,
            required: true
        },
        loading: {
            type: Boolean,
            default: false
        }
    }
});
</script>