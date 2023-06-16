import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['Administrator'];
  const roles = ['Client', 'Scheduler', 'Field Technician', 'Administrator', 'Team Leader'];
  const applicationName = `Epitet`;
  const tenantName = `Company`;
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `1. As an Administrator, I want to create a Company profile, so that I can manage my organization's scheduling and dispatching needs.

2. As an Administrator, I want to invite Schedulers, Field Technicians, and Team Leaders to join the Company, so that they can access and use the AI workforce scheduling software.

3. As a Scheduler, I want to create and manage work orders, so that I can assign tasks to Field Technicians and Team Leaders.

4. As a Scheduler, I want to view and optimize the scheduling of Field Technicians and Team Leaders, so that I can ensure efficient use of resources and minimize downtime.

5. As a Field Technician, I want to view my assigned work orders, so that I can plan my work schedule and complete tasks efficiently.

6. As a Field Technician, I want to update the status of my work orders, so that the Scheduler and Team Leader can track my progress and make necessary adjustments.

7. As a Team Leader, I want to view the work orders assigned to my team, so that I can manage and coordinate the tasks efficiently.

8. As a Team Leader, I want to update the status of work orders assigned to my team members, so that the Scheduler can track progress and make necessary adjustments.

9. As a Client, I want to submit a service request, so that I can receive assistance from the Company's Field Technicians or Team Leaders.

10. As a Client, I want to view the status of my service request, so that I can stay informed about the progress and estimated completion time.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="30px" bottom="20px" zIndex={3}>
      <Popover placement="top-end">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent w="50vw" h="70vh">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
