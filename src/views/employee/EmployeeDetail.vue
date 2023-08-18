<template>
    <div class="modal" v-if="detailMdl">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5>직원 정보 수정</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="doClose"></button>
                </div>
                <div class="modal-body">
                    <!-- 내용 -->
                    내용
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">저장</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useModalStore } from '@/stores';

const modalStore = useModalStore()
const { detailMdl } = storeToRefs(modalStore)

// methods
const doClose = () => {
    detailMdl.value = false
}
</script>