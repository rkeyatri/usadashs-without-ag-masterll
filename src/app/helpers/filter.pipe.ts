import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: '',
    pure: false
})

export class FilterPipe implements PipeTransform {
    transform(items: any[], args: any[]): any {
        return items.filter(item => item.name.indexOf(args[0]) !== -1);
    }
}
