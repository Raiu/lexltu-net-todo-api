import { ReactElement } from "react";
import { ISortOptions } from "@interfaces";

interface ISortSelectProps {
    options: ISortOptions[];
    current: ISortOptions;
    setSorting: (value: ISortOptions) => void;
}
export function SortSelect({ options, current, setSorting }: ISortSelectProps): ReactElement {
    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newOption = options.find((x) => x.value === e.target.value);
        if (newOption) {
            setSorting(newOption);
        }
    };

    return (
        <select
            className="SortSelect-select btn"
            name="sort-by"
            value={current.value}
            onChange={onChange}
        >
            {options.map((x, i) => {
                if (
                    (x.field === current.field && x.asc === current.asc) ||
                    (x.field !== current.field && !x.asc)
                ) {
                    return (
                        <option
                            className="SortSelect-option"
                            key={i}
                            value={x.value}
                            style={{ display: "none" }}
                        >
                            {x.label}
                        </option>
                    );
                }
                return (
                    <option className="SortSelect-option" key={i} value={x.value}>
                        {x.label}
                    </option>
                );
            })}
        </select>
    );
}
