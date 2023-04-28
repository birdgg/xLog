import { useTranslation } from "next-i18next"
import { Fragment, forwardRef, useState } from "react"
import type { ChangeEvent } from "react"

import { Combobox, Transition } from "@headlessui/react"

import { Input } from "~/components/ui/Input"

interface Props {
  tags: string[]
}

const CustomInput = forwardRef((props, ref) => {
  const { t } = useTranslation("dashboard")
  return (
    <Input
      {...props}
      ref={ref}
      name="tags"
      label={t("Tags") || ""}
      id="tags"
      isBlock
      help={t("Separate multiple tags with English commas") + ` ","`}
      autoComplete="off"
    />
  )
})
CustomInput.displayName = "CustomInput"

export function TagSelector({ tags = [] }: Props) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [query, setQuery] = useState("")
  console.log({ selectedTags })

  const onComboboxChange = (value) => {
    console.log({ value })
    setSelectedTags(value)
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setQuery(e.target.value)
  }

  const filteredTags =
    query === ""
      ? tags
      : tags.filter((tag) => {
          return tag.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Combobox value={selectedTags} onChange={setSelectedTags} multiple>
      <Combobox.Input
        as={CustomInput}
        displayValue={(tags: string[]) => {
          return tags.join(", ")
        }}
        onChange={onChange}
      />
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Combobox.Options className="absolute w-full pl-3 overflow-auto text-base">
          {filteredTags.map((tag) => (
            <Combobox.Option
              key={tag}
              className={`relative cursor-default select-none py-2 text-gray-900`}
              value={tag}
            >
              <span className={`block truncate font-normal `}>{tag}</span>
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Transition>
    </Combobox>
  )
}
