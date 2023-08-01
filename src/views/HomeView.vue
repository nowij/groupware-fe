<template>
  <form>
    <h4> Login </h4>
      <div class="mb-3">
        <label for="disabledTextInput" class="form-label">ID</label>
        <input type="text" id="disabledTextInput" class="form-control" placeholder="ID">
      </div>
      <div class="mb-3">
        <label for="disabledSelect" class="form-label">PASSWORD</label>
        <input type="text" id="disabledTextInput" class="form-control" placeholder="PASSWORD">
      </div>
      <button type="submit" class="btn btn-success">Submit</button>
      <router-link to="register" class="btn btn-primary">Register</router-link>
  </form>
</template>

<script>

</script>
