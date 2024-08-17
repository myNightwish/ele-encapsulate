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
    }
  },
  setup(props) {
    const { data, router, defaultActive } = props;

    const renderIcon = (icon) => {
      const IconComponent = iconMap[icon];
      return IconComponent ? (
        <span class="is-icon">
          <IconComponent size="small" />
        </span>
      ) : null;
    };

    const renderItem = (items, parentIndex = '') => {
      return items.map((item, idx) => {
        const { icon, name, children = [], index } = item;
        const uniqueIndex = parentIndex ? `${parentIndex}-${index || idx}` : index || String(idx);
        const hasChildren = Array.isArray(children) && children.length > 0;

        const title = (
          <>
            {renderIcon(icon)}
            <span>{name}</span>
          </>
        );

        return hasChildren ? (
          <el-sub-menu index={uniqueIndex} key={uniqueIndex}>
            {{
              title: () => title,
              default: () => renderItem(children, uniqueIndex),
            }}
          </el-sub-menu>
        ) : (
          <el-menu-item index={uniqueIndex} key={uniqueIndex}>
            {title}
          </el-menu-item>
        );
      });
    };

    return () => (
      <el-menu default-active={defaultActive} router={router} {...useAttrs()}>
        {renderItem(data)}
      </el-menu>
    );
  }
});
