import { getT } from 'next-i18next/server'

export default async function Home() {
  const { t: tAbilities } = await getT('abilities')
  
  return (
    <div>
      <h2 id="id" className='text-white'>
        {tAbilities('id.label')}
      </h2>
      <p className='text-white'>
        {tAbilities('id.info')}
      </p>
      <h2 id="name" className='text-white'>
        {tAbilities('name.label')}
      </h2>
      <p className='text-white'>
        {tAbilities('name.info')}
      </p>
      <h2 className='text-white'>
        {tAbilities('flags.label')}
      </h2>
      <p className='text-white'>
        {tAbilities('flags.info')}
      </p>
      <h2 className='text-white'>
        {tAbilities('description.label')}
      </h2>
      <p className='text-white'>
        {tAbilities('description.info')}
      </p>
    </div>
  )
}

export async function generateMetadata() {
  const { t } = await getT('abilities')
  return { title: "translation" }
}