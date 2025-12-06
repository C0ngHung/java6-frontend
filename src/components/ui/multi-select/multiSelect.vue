<template>
  <div ref="wrapperRef" class="relative w-full">
    <!-- Trigger -->
    <button
      class="flex w-full p-1 rounded-md border h-9 items-center justify-between bg-inherit hover:bg-accent cursor-pointer shadow-xs"
      @click="togglePopover"
      type="button"
    >
      <template v-if="selectedValues.length">
        <div class="flex items-center overflow-hidden w-full">
          <div class="flex items-center gap-1 overflow-x-auto no-scrollbar flex-nowrap w-full">
            <template v-for="value in limitedSelected" :key="String(value)">
              <span
                class="flex-shrink-0 flex items-center gap-1 px-2 py-1 text-sm rounded-sm bg-background border"
              >
                {{ getOption(value)?.label ?? value }}
                <X
                  class="size-4 cursor-pointer hover:text-destructive"
                  @click.stop="toggleOption(value)"
                />
              </span>
            </template>

            <span
              v-if="selectedValues.length > maxCount"
              class="flex-shrink-0 flex items-center gap-1 px-2 py-1 text-sm rounded-sm bg-background border"
            >
              + {{ selectedValues.length - maxCount }} hơn
              <X
                class="size-4 cursor-pointer hover:text-destructive"
                @click.stop="clearExtraOptions"
              />
            </span>
          </div>
          <div class="flex-shrink-0 flex items-center gap-2 ml-2">
            <XIcon class="h-4 cursor-pointer text-muted-foreground" @click.stop="clearAll" />
            <ChevronDown class="h-4 text-muted-foreground" />
          </div>
        </div>
      </template>

      <template v-else>
        <div class="flex items-center justify-between w-full">
          <span class="text-sm text-muted-foreground mx-2"> Vai trò </span>
          <ChevronDown class="h-4 text-muted-foreground" />
        </div>
      </template>
    </button>

    <!-- Dropdown -->
    <div
      v-if="isOpen"
      class="absolute z-50 mt-1.5 w-full bg-background border rounded-md shadow-md"
    >
      <div class="p-2 relative border-b border-border">
        <Search class="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
        <Input v-model="search" placeholder="Tìm kiếm" @keydown.enter.prevent class="pl-7" />
      </div>

      <ul class="max-h-60 overflow-y-auto p-2">
        <li
          :class="[
            'flex items-center justify-between px-2 py-1.5 cursor-pointer hover:bg-accent rounded-sm text-sm mb-1',
            isAllSelected && 'bg-accent',
          ]"
          @click="toggleAll"
        >
          <div class="flex items-center">
            <input
              type="checkbox"
              :checked="isAllSelected"
              class="mr-2 accent-primary"
              name="all"
            />
            {{ isAllSelected ? "Bỏ chọn" : "Chọn" }} tất cả
          </div>
          <Check v-if="isAllSelected" class="size-4 text-primary" />
        </li>
        <li
          v-for="option in filteredOptions"
          :key="String(option.value)"
          :class="[
            'flex items-center justify-between px-2 py-1.5 cursor-pointer hover:bg-accent rounded-sm text-sm mb-1 last:mb-0',
            selectedValues.includes(option.value) && 'bg-accent',
          ]"
          @click="toggleOption(option.value)"
        >
          <div class="flex items-center">
            <input
              type="checkbox"
              :checked="selectedValues.includes(option.value)"
              class="mr-2 accent-primary"
            />
            {{ option.label }}
          </div>
          <Check v-if="selectedValues.includes(option.value)" class="size-4 text-primary" />
        </li>
      </ul>
      <div class="flex items-center justify-between border-t px-2 py-2 gap-2">
        <button
          v-if="selectedValues.length"
          class="text-destructive hover:bg-destructive/10 px-2 h-8 rounded-md text-sm cursor-pointer"
          @click="clearAll"
        >
          Xóa sạch
        </button>
        <button
          class="ml-auto text-primary hover:bg-sidebar-accent px-2 h-8 rounded-md text-sm cursor-pointer"
          @click="isOpen = false"
        >
          Đóng
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue"
import { ChevronDown, XIcon, X, Check, Search } from "lucide-vue-next"
import Input from "../input/Input.vue"

type OptionValue = string | number
interface Option {
  label: string
  value: OptionValue
}

const props = withDefaults(
  defineProps<{
    options: Option[]
    modelValue?: OptionValue[]
    placeholder?: string
    maxCount?: number
  }>(),
  {
    modelValue: () => [],
    placeholder: "Chọn vai trò",
    maxCount: 2,
  }
)

const emit = defineEmits(["update:modelValue"])

const isOpen = ref(false)
const search = ref("")
const wrapperRef = ref<HTMLElement | null>(null)
const selectedValues = ref<OptionValue[]>([...props.modelValue])

const filteredOptions = computed(() =>
  props.options.filter((o) => o.label.toLowerCase().includes(search.value.toLowerCase()))
)
const isAllSelected = computed(() => selectedValues.value.length === props.options.length)
const maxCount = computed(() => props.maxCount)
const limitedSelected = computed(() => selectedValues.value.slice(0, maxCount.value))

const getOption = (value: OptionValue) => {
  return props.options.find((o) => o.value === value)
}

const toggleOption = (value: OptionValue) => {
  if (selectedValues.value.includes(value)) {
    selectedValues.value = selectedValues.value.filter((v) => v !== value)
  } else {
    selectedValues.value.push(value)
  }
  emit("update:modelValue", selectedValues.value)
}

const toggleAll = () => {
  if (isAllSelected.value) {
    clearAll()
  } else {
    selectedValues.value = props.options.map((o) => o.value)
    emit("update:modelValue", selectedValues.value)
  }
}
const clearAll = () => {
  selectedValues.value = []
  emit("update:modelValue", selectedValues.value)
}
const clearExtraOptions = () => {
  selectedValues.value = selectedValues.value.slice(0, maxCount.value)
  emit("update:modelValue", selectedValues.value)
}
const togglePopover = () => {
  isOpen.value = !isOpen.value
}

watch(
  () => props.modelValue,
  (newVal) => {
    selectedValues.value = [...(newVal ?? [])]
  }
)

const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (wrapperRef.value && !wrapperRef.value.contains(target)) isOpen.value = false
}
onMounted(() => document.addEventListener("click", handleClickOutside))
onBeforeUnmount(() => document.removeEventListener("click", handleClickOutside))
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
