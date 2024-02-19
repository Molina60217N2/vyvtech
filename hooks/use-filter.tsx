import useSWRImmutable from "swr/immutable";
import { useRouter } from "next/router";
import { JsonApiResource, DrupalNode } from "next-drupal";

type FilterResult = Pick<
  JsonApiResource,
  | "type"
  | "id"
  | "title"
  | "path"
  | "created"
  | "field_product_image"
  | "field_product_body"
  | "field_product_brand"
  | "field_product_price"
>;

interface Filter {
  isLoading?: boolean;
  isError?: boolean;
  results: FilterResult[];
  brand: string;
  category: string;
  current: string;
}

export function useFilter(
  brand: string,
  category: string,
  current: string
): Filter {
  const router = useRouter();

  const { data, error } = useSWRImmutable<FilterResult[]>(
    brand || category
      ? `api/filter/${brand}/${category}/${current}/${router.locale}`
      : null,
    async function () {
      const response = await fetch("/api/filter", {
        method: "POST",
        body: JSON.stringify({
          brand,
          category,
          current,
          locale: router.locale,
          defaultLocale: router.defaultLocale,
        }),
      });
      return response.json();
    }
  );

  return {
    isLoading: !error && !data,
    isError: error,
    results: data,
    brand: brand,
    category: category,
    current: current,
  };
}
