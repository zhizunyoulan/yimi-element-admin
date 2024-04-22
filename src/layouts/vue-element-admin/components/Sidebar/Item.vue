<script>
export default {
  name: "MenuItem",
  functional: true,
  props: {
    icon: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
  render(h, context) {
    const { icon, title } = context.props;
    const vnodes = [];

    if (icon) {
      if (icon.includes("el-icon")) {
        let classes = {};
        classes[icon] = true;
        classes["sub-el-icon"] = true;
        vnodes.push(
          h("i", {
            class: classes,
          })
        );
        // vnodes.push(<i class={[icon, 'sub-el-icon']} />)
      } else {
        vnodes.push(
          h("svg-icon", {
            props: {
              iconClass: icon,
            },
          })
        );
        // vnodes.push(<svg-icon icon-class={icon}/>)
      }
    }

    if (title) {
      vnodes.push(
        h(
          "span",
          {
            slot: "title",
          },
          title
        )
      );
      // vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes;
  },
};
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
