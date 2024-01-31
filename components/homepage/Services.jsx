import data from './services.json';
import styles from './services.module.css'
export default function Services() {
  return (
    <div className={`flex justify-items-center flex-col ${styles.gradient}`}>
      <div className='max-[768px]:w-80 max-[768px]:mx-auto'>
        <h2 className="text-center font-bold text-5xl max-[768px]:text-[24px] text-[#122049]">SERVICIOS QUE PROPORCIONAMOS</h2>
      </div>
      <div className="pt-24 grid grid-cols-[460px,460px] justify-center max-[768px]:flex max-[768px]:flex-col max-[768px]:pl-5 justify-items-center">
        {data.map((service, index) => (
          <div className='pb-10' key={index}>
            <div className='flex'>
            <div className='pr-3' dangerouslySetInnerHTML={{ __html: service.icon }} />
            <h3 className="font-semibold text-[18px]">{service.title}</h3>
            </div>
            <div className='w-80 pt-2 text-[18px]'>
            <p>{service.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}