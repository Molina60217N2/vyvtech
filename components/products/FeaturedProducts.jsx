import NodeProductTeaser from "./node--product--teaser";


export default function FeaturedProducts(props){
    {
        {
            props.nodes?.length ? (
              props.nodes.map((feature) => (
                <div key={feature.id}>
                  <NodeProductTeaser
                  node={feature}/>
                  <hr className="my=20"/>
                </div>
              ))
            ) : (
              <p className="py-4">No products found</p>
            )
          }
    }

}