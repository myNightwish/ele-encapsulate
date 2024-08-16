// 使用 jsx 的形式 封装无限组件
import { defineComponent, useAttrs } from 'vue';
import {iconMap} from '@/config/iconPicker.js';

export default defineComponent({
  name: 'InfiniteMenu',
  props: {
    data: { type: Array, require: true },
    defaultActive: { type: String, default: '' },
    // 是否是路由模式
    router: {
      type: Boolean,
      default: false
    }
  },
  setup(props, _) {
    const { data, router, defaultActive } = props;
 
    // 封装一个渲染函数
    const renderItem = (data, depth) => {
      return data.map((item, idx) => {
        const { icon, name, children = [], index} = item;
        const titleSlots = {
          title: () => {
            const iconComp = iconMap[icon];
            return <>
              <span class="is-icon">
                <iconComp size="small"/>
              </span>
              <span>{name}</span>
            </>
          }
        }
        return children && children.length > 0 ? 
          <el-sub-menu index={index} v-slots={titleSlots}>
          {renderItem(children, depth+1)}
        </el-sub-menu> : <el-menu-item index={index}>
            {titleSlots.title()}
        </el-menu-item>
      })
    };

    return () => <el-menu
        default-active={defaultActive}
        router={router}
        {...useAttrs()}
      >
        {renderItem(data, 1)}
      </el-menu>
  }
});


