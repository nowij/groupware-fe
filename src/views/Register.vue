<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="card mb-3">
                <div class="card-body">
                    <div class="p-3">
                        <h5 class="card-title text-center pb-0 fs-4">회원가입</h5>
                    </div>

                    <form class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label">사번</label>
                            <input type="text" class="form-control">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">부서</label>
                            <select class="form-select">
                                <option value="1" selected>One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">이름</label>
                            <input type="text" class="form-control">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">직위</label>
                            <select class="form-select">
                                <option value="1" selected>One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                        <div class="col-12">
                            <label class="form-label">비밀번호</label>
                            <input type="text" class="form-control">
                        </div>
                        <div class="col-12">
                            <label class="form-label">이메일</label>
                            <div class="input-group">
                                <input type="text" class="form-control">
                                <span class="input-group-text">@nowij.com</span>
                            </div>
                        </div>
                        <div class="col-12">
                            <label for="inputAddress5" class="form-label">전화번호</label>
                            <input type="text" class="form-control" placeholder="010-0000-0000">
                        </div>
                        <div class="col-12">
                            <label for="inputAddress2" class="form-label">주소</label>
                            <input type="text" class="form-control">
                        </div>
                        <div class="text-center">
                            <button type="submit" class="btn btn-primary w-100">등록</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.card {
    width: 30rem;
}
</style>