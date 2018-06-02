<template>
<div> </div>
</template>

<script>
// 本画面にアクセスできる = 認証済み（未認証だとミドルウェアで弾かれる）
// そのため本画面アクセス時はeditor画面に遷移
export default {
  fetch ({ redirect, route}) {
   redirect('/editor')
  }
}
</script>