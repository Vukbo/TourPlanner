import { Button, createListCollection, Field, Fieldset, Flex, Group, Heading, HStack, IconButton, Input, Link, Portal, Select, Separator, Spacer, Stack, Textarea, useSelectContext } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { LuAArrowUp, LuBike, LuCircleArrowLeft, LuMountain } from "react-icons/lu";
import { TransportTypes, type Tour } from "~/models/tour";
import { TourService } from "~/queries/rest";

const transportTypeOptions = createListCollection({
    items: [
        { label: "Hiking", value: 0, icon: <LuMountain /> },
        { label: "Biking", value: 1, icon: <LuBike /> },
    ],
})

interface TransportTypeOption {
    label: string
    value: number
    icon: React.ReactNode
}

const SelectTrigger = () => {
  const select = useSelectContext()
  const items = select.selectedItems as TransportTypeOption[]
  return (
    <IconButton
      px="2"
      variant="outline"
      size="sm"
      {...select.getTriggerProps()}
    >
      {select.hasSelectedItems ? items[0].icon : <LuAArrowUp />}
    </IconButton>
  )
}

export default function TourManagement() {
    const [tour, setTour] = useState<Tour>({author:"",from: "",to:"",title:"",transportType:TransportTypes.Hiking})
    const mutation = useMutation({
        mutationFn: (tour:Tour) => {
            return TourService.post('tours',tour)
        }
    })

    return (
        <Stack minWidth="xs" maxWidth="md" borderWidth="1px" borderColor="border.disabled" borderRadius="sm" color="fg.disabled" p="2.5">
            <Stack direction="row" align="center">
                <Link href="/tours">
                <IconButton  variant="ghost">
                    <LuCircleArrowLeft />
                </IconButton>
                </Link>
                <Heading textAlign="center" flexGrow="1" > Tour Managment</Heading>
                <Select.Root 
                    width="10"
                    positioning={{ sameWidth: false }}
                    collection={transportTypeOptions}
                    defaultValue={[0]}
                >
                    <Select.HiddenSelect />
                    <Select.Control>
                        <SelectTrigger />
                    </Select.Control>
                    <Portal>
                        <Select.Positioner>
                            <Select.Content minW="32">
                                {transportTypeOptions.items.map((framework) => (
                                    <Select.Item item={framework} key={framework.value}>
                                        <HStack>
                                            {framework.icon}
                                            {framework.label}
                                        </HStack>
                                        <Select.ItemIndicator />
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Positioner>
                    </Portal>
                </Select.Root>
            </Stack>
            <Separator />
            <Stack>

                <Fieldset.Root >
                    <Fieldset.Legend>

                    </Fieldset.Legend>
                    <Fieldset.Content>
                        <Group>
                            <Field.Root required>
                                {/* <Field.Label>From</Field.Label> */}
                                <Input onChange={v => setTour({...tour, from: v.target.value})} placeholder="From" />
                            </Field.Root>
                            <Field.Root required >
                                {/* <Field.Label>To</Field.Label> */}
                                <Input onChange={v => setTour({...tour, to: v.target.value})} placeholder="To" />
                            </Field.Root>
                        </Group>
                    </Fieldset.Content>
                </Fieldset.Root>
                <Field.Root >
                    {/* <Field.Label>Tour Name</Field.Label> */}
                    <Input onChange={v => setTour({...tour, title: v.target.value})} placeholder="Tour Name" />
                </Field.Root>
                <Field.Root >
                    {/* <Field.Label>Tour Description</Field.Label> */}
                    <Textarea onChange={v => setTour({...tour, description: v.target.value})} autoresize minHeight="5lh" maxHeight="10lh" placeholder="Description" />
                </Field.Root>
            </Stack>
            <Spacer />
            <Button onClick={() => {
                mutation.mutate(tour)
            }} >
                Create Tour
            </Button>
        </Stack>
    )
}