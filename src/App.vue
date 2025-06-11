<template>
  <div id="app">
    <header class="app-header">
      <div class="navbar-container">
        <div class="nav-menu">
          <router-link to="/" class="nav-link" :class="{ active: $route.name === 'add-address' }">
            ثبت آدرس
          </router-link>
          <router-link to="/addresses" class="nav-link" :class="{ active: $route.name === 'address-list', green: $route.name === 'address-list' }">
            مشاهده آدرس ها
          </router-link>
        </div>
        <img src="/assets/logo.png" alt="آچاره" class="logo" />
      </div>
    </header>
    <div class="header-divider"></div>
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
.app-header {
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-container {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  height: 48px;
}

.logo {
  height: 32px;
  width: auto;
  margin-right: 0.5rem;
}

.nav-menu {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: center;
  margin-left: 1rem;
}

.nav-link {
  font-size: 1rem;
  color: #222;
  text-decoration: none;
  font-weight: 400;
  transition: color 0.2s;
  padding: 0 0.25rem;
}

.nav-link.active {
  font-weight: 700;
  color: #222;
}

.nav-link.green {
  color: #20b2aa;
  font-weight: 700;
}

.nav-link:not(.active):hover {
  color: #20b2aa;
}

.header-divider {
  width: 100%;
  height: 2px;
  background: #f2f2f2;
  margin: 0;
}

.main-content {
  min-height: calc(100vh - 50px);
  background: #f8fafc;
}

@media (max-width: 768px) {
  .navbar-container {
    flex-direction: row-reverse;
    padding: 0.5rem 0.5rem;
  }
  .nav-menu {
    gap: 1rem;
    margin-left: 0.5rem;
  }
  .logo {
    height: 28px;
  }
}
</style> 