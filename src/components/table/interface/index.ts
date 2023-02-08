import { InputProps, ElSelect, TimePickerDefaultProps } from 'element-plus';
import { TimeSelectProps } from 'element-plus/es/components/time-select/src/time-select';
import { BreakPoint, Responsive } from '@/components/dvGrid/interface/index';

interface Input {
    el: 'input';
    props?: Partial<InputProps>;
}
interface Select {
    el: 'select';
    props?: Partial<typeof ElSelect.__defaults>;
}

interface TreeSelect {
    el: 'tree-select';
    props?: any;
}

interface DatePicker {
    el: 'date-picker';
    props?: any;
}

interface TimePicker {
    el: 'time-picker';
    props?: Partial<TimePickerDefaultProps>;
}

interface TimeSelect {
    el: 'time-select';
    props?: Partial<TimeSelectProps>;
}

export type BaseSearch = {
    key?: string; // 当搜索项 key 不为 prop 属性时，可通过 key 指定
    order?: number; // 搜索项排序（从大到小）
    span?: number; // 搜索项所占用的列数，默认为1列
    offset?: number; // 搜索字段左侧偏移列数
    defaultValue?: string | number | boolean | any[]; // 搜索项默认值
} & Partial<Record<BreakPoint, Responsive>>;

export type SearchProps = BaseSearch &
    (Input | Select | DatePicker | TimePicker | TimeSelect | TreeSelect);

export interface ColumnProps {
    search?: SearchProps | undefined; // 搜索项配置
}
