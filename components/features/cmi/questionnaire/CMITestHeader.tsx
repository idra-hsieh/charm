import { useTranslations } from "next-intl";
import ProgressBar from "./ProgressBar"

type Props = {
    current: number;
    total: number;
    onPrevious: () => void;
}

function CMITestHeader({ current, total, onPrevious }: Props) {
  const t = useTranslations("cmi.ui");
    
  return (
      <div className="w-full h-[200px] bg-marble rounded-b-3xl text-foreground">
          <div className='flex flex-col items-center justify-center text-center h-full space-y-2 mt-1'>
              <h1 className='font-bold text-foreground/90 text-xl'>{t('header_title')}</h1>
              <p className='text-xs text-foreground/65 max-w-[320px]'>
                  <span className='font-semibold'>
                      {t('header_desc_1')}
                  </span>
                  {" "}
                  {t('header_desc_2')}
              </p>
              <div className="mt-3 w-full flex justify-center">
                  <ProgressBar current={current} total={total} onPrevious={onPrevious}/>
              </div>
          </div>
     </div>
  )
}

export default CMITestHeader
