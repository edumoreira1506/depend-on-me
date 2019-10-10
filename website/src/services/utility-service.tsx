import { padding_direction } from "../models/types";

/**
 * frontend utility microservice 
 */
export class UtilityService {

    /**
     * converts a padding direction and a value into a padding css value. this does 
     * not support complex combinations (ie different values for each individual direction)
     * @param padding the direction of the padding
     * @param value the value to apply to padding
     */
    public static padding_to_css(padding: padding_direction, value: string): string {
        switch (padding) {
            case 'left':
                return '0 0 0 ' + value;
            case 'right':
                return '0 ' + value + ' 0 0';
            case 'top':
                return value + ' 0 0 0';
            case 'bottom':
                return '0 0 ' + value + ' 0';
            case 'horizontal':
                return '0 ' + value + ' 0 ' + value;
            case 'vertical':
                return value + ' 0 ' + value + ' 0';
            case 'all':
                return value + ' ' + value + ' ' + value + ' ' + value;
            default:
                return '0 0 0 0';
        }
    }

    /**
     * removes all characters before the first occurrence of <delimiter> in <src>
     * @param src the string being split up
     * @param delimiter the character or string used to split the string 
     */
    public static remove_prefix(src: string, delimiter: string): string {
        let parts: string[] = src.split(delimiter);
        let suffix: string = '';
        for (let i: number = 1; i < parts.length; i++) {
            suffix += parts[i] + ' ';
        }
        return suffix;
    }
}