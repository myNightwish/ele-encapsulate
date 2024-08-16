// 使用 jsx 的形式 封装无限组件
import { defineComponent, useAttrs } from 'vue';
import { iconMap } from '@/config/iconPicker.js';

export default defineComponent({
  name: 'InfiniteMenu',
  props: {
    data: {
      type: Array,
      required: true,
    },
    defaultActive: {
      type: String,
      default: '',
    },
    router: {
      type: Boolean,
      default: false,
    },
    hasUniqueKey: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { data, router, defaultActive } = props;

    const renderIcon = (icon) => {
      console.log('iconMap--', iconMap)
      const IconComponent = iconMap[icon];
      return IconComponent ? (
        <span class="is-icon">
          <IconComponent size="small" />
        </span>
      ) : null;
    };

    const renderItem = (items, parentIndex = '') => {
      return items.map((item, idx) => {
        const { icon, name, children = [] } = item;
        // const index = parentIndex && !props.hasUniqueKey ? `${parentIndex}-${idx}` : String(idx);
        const index = String(idx);

        const hasChildren = Array.isArray(children) && children.length > 0;

        const title = (
          <>
            {renderIcon(icon)}
            <span>{name}</span>
          </>
        );

        return hasChildren ? (
          <el-sub-menu index={index} key={index}>
            {{
              title: () => title,
              default: () => renderItem(children, index),
            }}
          </el-sub-menu>
        ) : (
          <el-menu-item index={index} key={index}>
            {title}
          </el-menu-item>
        );
      });
    };

    return () => (
      <el-menu default-active={defaultActive} router={router}  {...useAttrs()}>
        {renderItem(data)}
      </el-menu>
    );
  }
});
