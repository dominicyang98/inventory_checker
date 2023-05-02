export default defineConfig({
    plugins: [vue()],
    build:{
        target:['edge90','chrome90','firefox90','safari15']
    }
})