<template>
    <div class="card">
        <form>
            <div class="card-header text-center">회원가입</div>
            <div class="card-body">
                <div class="mb-3">
                    <label class="form-label">사번</label>
                    <input type="text" id="employee_id" class="form-control"/>
                </div>
                <div class="mb-3">
                    <label class="form-label">이름</label>
                    <input type="text" id="user_name" class="form-control"/>
                </div>
                <div class="mb-3">
                    <label class="form-label">비밀번호</label>
                    <input type="text" id="user_passwd" class="form-control"/>
                </div>
                <div class="mb-3">
                    <label class="form-label">이메일</label>
                    <input type="text" id="email" class="form-control"/>
                </div>
                <div class="mb-3">
                    <label class="form-label">전화번호</label>
                    <input type="text" id="phone" class="form-control"/>
                </div>
                <div class="mb-3">
                    <label class="form-label">주소</label>
                    <input type="text" id="address" class="form-control"/>
                </div>
                <div class="mb-3">
                    <label class="form-label">부서</label>
                    <input type="text" id="dept_code" class="form-control"/>
                </div>
                <div class="mb-3">
                    <label class="form-label">직위</label>
                    <input type="text" id="position_code" class="form-control"/>
                </div>
            </div>
            <div class="d-flex justify-content-center">
                <button type="submit" class="btn btn-success mb-1">등록</button>
            </div>
        </form>
    </div>
</template>

<style>
.card {
    width: 30rem;
}
</style>