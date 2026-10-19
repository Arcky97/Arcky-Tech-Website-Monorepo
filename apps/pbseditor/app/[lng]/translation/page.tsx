import { getT } from 'next-i18next/server'

export default async function Home() {
  const { t } = await getT('abilities')
  return (
    <div>
      <h2 className='text-white'>
        {t('id.label')}
      </h2>
      <p className='text-white'>
        {t('id.info')}
      </p>
      <h2 className='text-white'>
        {t('name.label')}
      </h2>
      <p className='text-white'>
        {t('name.info')}
      </p>
      <h2 className='text-white'>
        {t('flags.label')}
      </h2>
      <p className='text-white'>
        {t('flags.info')}
      </p>
      <h2 className='text-white'>
        {t('description.label')}
      </h2>
      <p className='text-white'>
        {t('description.info')}
      </p>
    </div>
  )
}

export async function generateMetadata() {
  const { t } = await getT('abilites')
  return { title: t('name.label') }
}