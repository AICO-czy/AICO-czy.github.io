<template>
    <div class="dropdown">
        <div class="dropdown-toggle" :class="{ open: isOpen }" @click.stop="toggleDropdown" @keydown.stop="handleKeydown"
            tabindex="0">
            <span class="selected-value">{{ internalSelected || placeholder }}</span>
            <span class="arrow" :class="{ open: isOpen }">▼</span>
        </div>

        <div class="dropdown-menu" :class="{ open: isOpen }">
            <div v-for="(option, index) in options" :key="option" class="dropdown-item" :class="{
                selected: option === internalSelected,
                focused: index === focusedIndex
            }" @click.stop="selectOption(option)">
                {{ option }}
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
    name: 'DropdownSelector',
    props: {
        options: {
            type: Array,
            required: true
        },
        selected: {
            type: String,
            default: null
        },
        placeholder: {
            type: String,
            default: '请选择'
        }
    },
    emits: ['update:selected'],
    setup(props, { emit }) {
        const isOpen = ref(false);
        const internalSelected = ref(props.selected);
        const focusedIndex = ref(-1);

        const toggleDropdown = () => {
            isOpen.value = !isOpen.value;
            if (isOpen.value) {
                focusedIndex.value = props.options.indexOf(internalSelected.value);
            }
        };

        const selectOption = (option) => {
            internalSelected.value = option;
            emit('update:selected', option);
            isOpen.value = false;
            focusedIndex.value = -1;
        };

        const handleKeydown = (e) => {
            if (!isOpen.value) {
                if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    isOpen.value = true;
                }
                return;
            }

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    focusedIndex.value = Math.min(focusedIndex.value + 1, props.options.length - 1);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    focusedIndex.value = Math.max(focusedIndex.value - 1, 0);
                    break;
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    if (focusedIndex.value >= 0) {
                        selectOption(props.options[focusedIndex.value]);
                    }
                    break;
                case 'Escape':
                    e.preventDefault();
                    isOpen.value = false;
                    focusedIndex.value = -1;
                    break;
            }
        };

        const handleClickOutside = (event) => {
            const dropdownEl = event.target.closest('.dropdown');
            if (!dropdownEl) {
                isOpen.value = false;
                focusedIndex.value = -1;
            }
        };

        onMounted(() => {
            document.addEventListener('click', handleClickOutside);
        });

        onUnmounted(() => {
            document.removeEventListener('click', handleClickOutside);
        });

        return {
            isOpen,
            internalSelected,
            focusedIndex,
            toggleDropdown,
            selectOption,
            handleKeydown
        };
    }
};
</script>

<style scoped>
/* 在这里添加组件的样式，与上面代码中的样式相同 */
.dropdown {
    position: relative;
    width: 100%;
    z-index: 99999 !important;
    /* margin-bottom: 20px; */
}

.dropdown-toggle {
    width: 100%;
    padding: 14px 20px;
    /* background: white; */
    border: 2px solid #e8e8e8;
    border-radius: 12px;
    font-size: 16px;
    text-align: left;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s ease;
}

.dropdown-toggle:hover {
    border-color: #3498db;
}

.dropdown-toggle:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}

.dropdown-toggle.open {
    border-radius: 12px 12px 0 0;
    border-color: #3498db;
}

.arrow {
    transition: transform 0.3s ease;
    font-size: 30px;
    background: linear-gradient(90deg, #DAE6FA 0%, #96CDED 100%);
    font-style: normal;
    text-transform: none;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.arrow.open {
    transform: rotate(180deg);
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    border: 2px solid #3498db;
    background: #3498db;
    border-top: none;
    border-radius: 0 0 12px 12px;
    font-size: 40px;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
}

.dropdown-menu.open {
    max-height: 200px;
    overflow-y: auto;
    z-index: 99999 !important;
}

.dropdown-item {
    padding: 12px 20px;
    cursor: pointer;
    color: white;
    transition: background 0.2s ease;
}

.dropdown-item:hover {
    background: #f1f8ff;
}

.dropdown-item.selected {
    background: #14659c;
    color: white;
}

.selected-value {
    /* color: #2c3e50; */
    font-weight: 500;
    font-size: 35px;
    background: linear-gradient(90deg, #DAE6FA 0%, #96CDED 100%);
    font-style: normal;
    text-transform: none;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
</style>
