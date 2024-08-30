declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'vuex' {
  import { Store } from 'vuex';
  export * from 'vuex';
  export default Store;
}
